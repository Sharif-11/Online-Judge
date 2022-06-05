import React from "react";

const Login = () => {
	return (
		<div>
			<h6 className="text-md font-bold mt-10">
				Fill in the form to register in CuetOj.
			</h6>
			<p className="font-semibold">
				You can use <button className="text-[blue] underline">Gmail</button> as
				an alternative way to enter.
			</p>
			<div className="register rounded-sm border w-96 mx-auto mt-8">
				<h2 className="p-1 font-semibold text-[blue]">Log into CuetOj</h2>
				<hr />
				<form className="my-8">
					<div className=" w-4/5 mx-auto flex my-3">
						<span className="mr-4 text-md font-semibold w-1/3 text-right">
							Email
						</span>
						<input type="email" name="" id="" className="border w-2/3" />
					</div>
					<div className=" w-4/5 mx-auto flex my-3">
						<span className="mr-4 text-md font-semibold w-1/3 text-right">
							Password
						</span>
						<input type="password" name="" id="" className="border w-2/3" />
					</div>

					<button
						type="submit"
						className="mx-auto border block font-semibold px-5"
					>
						Login
					</button>
					<button
						type="button"
						className="text-[blue] text-sm underline block ml-auto mr-4 mt-4"
					>
						Forgot your password?
					</button>
				</form>
				<div className="bottom flex justify-end py-1 pr-2 bg-[rgba(0,0,0,0.02)]">
					<button className="text-sm text-primary underline">Use Gmail</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
