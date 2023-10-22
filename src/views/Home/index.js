import React from 'react'
import ButtonMoveAround from "../Components/ButtonMoveAround"

function Home() {
	return (
		<>
			<p>Home</p>
            <div class="d-flex justify-content-center">
                <ButtonMoveAround avoidClick={true} />
            </div>
			
			<p>
				Welcom to my home page, still working on the home page, maybe
				working on the css later, just adding stuff and functionality
				into it so far
			</p>
		</>
	)
}

export default Home
