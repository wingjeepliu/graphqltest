import React, { useState } from 'react'
function CustomSelectWithHook({ type , id, optFunc}) {
    console.log("optFunc call ===");
    const [value, setValue] = useState("");
    const selectEl = <select id ={id} value={value} onChange={e => setValue(e.target.value)}>
        {optFunc()}
    </select>;
    return [value, selectEl];
}

export default CustomSelectWithHook;