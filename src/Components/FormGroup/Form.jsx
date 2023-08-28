import React from "react";

const Form = React.forwardRef((props, ref) => {
  return (
    <div className="flex flex-col mb-[20px]">
      <label htmlFor={props.labelFor}>{props.labelName}</label>
      <input
        onChange={props.onChange}
        type={props.type}
        id={props.inputId}
        className={`w-[100%] h-[40px] px-[12px] py-[7px] text-slate-700 placeholder:opacity-50 border-[1px] rounded-md ${props.inputcss}`}
        ref={ref}
        pattern={props.pattern}
        src={props.src}
      />
    </div>
    
  );
});

Form.defaultProps = {
  type: "text",
};
export default Form;
