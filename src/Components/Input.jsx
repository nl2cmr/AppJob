export const Input = ({name, placeholder,type,onChange,value,label}) => {
    return (
        <div className="input-group">
            <label className="inp" htmlFor={name}>{label}</label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;


