import React, { useEffect, useRef, useState } from "react";

const Problem = () => {
	const [jsx, setJsx] = useState("");
	useEffect(() => {
		document.getElementById("preview").innerHTML = jsx;
	}, [jsx]);
	return (
		<div>
			<label htmlFor="jsx">Description</label>
			<br />
			<textarea
				id="jsx"
				name="jsx"
				cols="30"
				rows="10"
				value={jsx}
				onChange={(e) => setJsx(e.target.value)}
			></textarea>
			<div id="preview"></div>
		</div>
	);
};

export default Problem;
