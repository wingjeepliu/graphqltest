import React, { useState } from 'react'
function CustomInputWithHook({ type , id}) {
    const [value, setValue] = useState("");
    const input = <input id ={id} value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
}
export default CustomInputWithHook;