export const Textarea = ({name,label,value,onChange}) => {
    return (
        <div className="textarea-group">
            <label className="txta" htmlFor={name}>{label}</label>
            <textarea name={name} onChange={onChange}>
                {value}
            </textarea>
        </div>
    );
};

export default Textarea;


