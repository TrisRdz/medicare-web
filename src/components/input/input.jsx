import './inputStyles.css';

const DefaultInput = ({ label, placeholder, onChange, value, type = 'text' }) => (
   <div>
       {!!label && <p className='inputLabel'>{label}</p>}
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