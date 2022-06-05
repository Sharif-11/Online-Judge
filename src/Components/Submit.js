import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const Submit = () => {
	const [submission, setSubmission] = useState(0);
	const codeRef = useRef("");
	// const languageRef = useRef("");
	const inputRef = useRef("");
	const outputRef = useRef("");
	useEffect(() => {
		fetch("http://localhost:5000/used")
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setSubmission(data?.used);
			});
	}, [outputRef]);
	const handleSubmit = (e) => {
		e.preventDefault();

		const sourceCode = codeRef.current.value;
		const inputValue = inputRef.current.value;
		const info = {
			language: "cpp17",
			sourceCode,
			inputValue,
		};
		axios
			.post("http://localhost:5000", info)

			.then(({ data }) => {
				console.log(data);
				outputRef.current.value = `${data?.response?.body?.output}`;
			});
	};
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
				height: "100vh",
			}}
		>
			<form
				onSubmit={handleSubmit}
				style={{
					width: "350px",
					maxWidth: "95vw",
				}}
			>
				<div className="input-group">
					<textarea
						ref={codeRef}
						cols="30"
						rows="10"
						placeholder="Enter Your Code in C++"
						style={{
							width: "100%",
						}}
					></textarea>
				</div>
				<div className="input-group">
					<input type="submit" value="Submit" />
				</div>
				<div className="input-group">
					<label htmlFor="input">Input</label>
					<textarea
						cols="30"
						rows="10"
						ref={inputRef}
						id="input"
						style={{
							height: "80px",
							width: "100%",
							padding: "5px",
						}}
						placeholder="Enter Input if applicable"
					></textarea>
				</div>
				<div className="input-group">
					<label htmlFor="output">Output</label>
					<br />
					<textarea
						cols="30"
						rows="10"
						ref={outputRef}
						id="output"
						readOnly
						style={{
							height: "80px",
							width: "100%",
							padding: "5px",
						}}
					></textarea>
				</div>
			</form>
			<h2>Trial used:{submission}</h2>
		</div>
	);
};

export default Submit;
