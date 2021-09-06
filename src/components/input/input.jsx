import './inputStyles.css';

const DefaultInput = ({ label, placeholder, onChange, value, type = 'text' }) => (
   <div className='inputContainer'>
       {!!label && <span className='inputLabel'>{label}</span>}
        <input 
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className='inputBox'
            type={type}
        />
   </div>
);

export default DefaultInput;