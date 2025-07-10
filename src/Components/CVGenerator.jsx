import { useState } from "react";
import { FaFileDownload } from 'react-icons/fa';

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
            handleFileSelection(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFileSelection(e.target.files[0]);
        }
    };

    const validateFileType = (file) => {
        const acceptedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'text/plain'
        ];
        const acceptedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
        const fileExtension = file.name.split('.').pop().toLowerCase();
        
        return acceptedTypes.includes(file.type) || 
               acceptedExtensions.includes(`.${fileExtension}`);
    };

    const handleFileSelection = (file) => {
        if (validateFileType(file)) {
            setFile(file);
            setError(null);
        } else {
            setError("Type de fichier non supporté. Veuillez uploader un PDF, DOC ou DOCX.");
            setFile(null);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setError("Veuillez sélectionner un fichier CV");
            return;
        }
    
        setIsLoading(true);
        setError(null);
    
        const formData = new FormData();
        formData.append('cvfile', file);
    
        try {
            const response = await fetch('https://localhost/backend/analyse_cv.php', {
                method: 'POST',
                body: formData
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                throw new Error(result.error || 'Erreur lors de l\'analyse');
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
                <FaFileDownload />
            </div>
            <p className="cv-upload-instructions">Glissez-déposez votre CV ici ou</p>
            <input 
                type="file" 
                name="cvfile" 
                id="cvfile" 
                onChange={handleChange}
                accept=".pdf,.doc,.docx,.txt"
                className="cv-file-input"
            />
            <label htmlFor="cvfile" className="cv-upload-label">
                Sélectionner un fichier
            </label>
            {file && (
                <div className="cv-file-info">
                    <span>{file.name}</span>
                    <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
            )}
            <button 
                type="button" 
                className={`cv-upload-button ${isLoading ? "loading" : ""}`}
                disabled={!file || isLoading}
                onClick={handleSubmit}
            >
                {isLoading ? (
                    <>
                        <span className="spinner"></span>
                        Analyse en cours...
                    </>
                ) : (
                    "Analyser et remplir mon profil"
                )}
            </button>
            
            {error && (
                <div className="cv-error">
                    <span>⚠️</span>
                    {error}
                </div>
            )}
            
            {success && (
                <div className="cv-success">
                    <span>✓</span>
                    <p>CV analysé avec succès! Vos informations ont été mises à jour.</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="cv-refresh-button"
                    >
                        Actualiser la page
                    </button>
                </div>
            )}
        </div>
    );
};