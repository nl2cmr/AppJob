import { useState } from "react";

export const CVGenerator = () => {
    const [file, setFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const droppedFile = e.dataTransfer.files[0];
            if (validateFileType(droppedFile)) {
                setFile(droppedFile);
            } else {
                setError("Type de fichier non supporté. Veuillez uploader un PDF, DOC ou DOCX.");
            }
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (validateFileType(selectedFile)) {
                setFile(selectedFile);
                setError(null);
            } else {
                setError("Type de fichier non supporté. Veuillez uploader un PDF, DOC ou DOCX.");
            }
        }
    };

    const validateFileType = (file) => {
        const acceptedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
        return acceptedTypes.includes(file.type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Veuillez sélectionner un fichier CV");
            return;
        }
    
        if (file.size > 5 * 1024 * 1024) {
            setError("Le fichier est trop volumineux (max 5MB)");
            return;
        }
    
        const userData = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
        if (!userData || !userData.iduser) {
            setError("Utilisateur non connecté");
            return;
        }
    
        setIsLoading(true);
        setError(null);
        setSuccess(false);
    
        const formData = new FormData();
        formData.append('cv', file);
        formData.append('iduser', userData.iduser);
    
        try {
            const response = await fetch('http://localhost/backend/cv_model/extract_cv.php', {
                method: 'POST',
                body: formData
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                throw new Error(result.message || "Erreur lors de l'analyse du CV");
            }
    
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div 
            className={`cv-upload-container ${dragActive ? "drag-over" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
        >
            <div className="cv-upload-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#4a6cf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2V8H20" stroke="#4a6cf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 18V12" stroke="#4a6cf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 15H15" stroke="#4a6cf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <p className="cv-upload-instructions">Glissez-déposez votre CV ici ou</p>
            <input 
                type="file" 
                name="cvfile" 
                id="cvfile" 
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.txt"
            />
            <label htmlFor="cvfile" className="cv-upload-label">
                Sélectionner un fichier
            </label>
            {file && (
                <div className="cv-file-info">
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </div>
            )}
            <button 
                type="button" 
                className="cv-upload-button" 
                disabled={!file || isLoading}
                onClick={handleSubmit}
            >
                {isLoading ? "Analyse en cours..." : "Analyser et remplir mon profil"}
            </button>
            
            {error && <div className="cv-error">{error}</div>}
            {success && (
                <div className="cv-success">
                    CV analysé avec succès! Vos informations ont été mises à jour.
                    <button onClick={() => window.location.reload()} className="cv-refresh-button">
                        Actualiser la page
                    </button>
                </div>
            )}
        </div>
    );
};