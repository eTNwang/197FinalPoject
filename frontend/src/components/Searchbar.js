import React from 'react';




const Searchbar = (props) => {
	
	return (
		
		<div className='col col-sm-4'>
			<input
				className='form-control'
				onKeyPress={(event) => {
					if (event.key === "Enter") {
						if( props.lockout === true ) { //Already pressed don't allow another press
							alert("Please wait 5 seconds between key presses to avoid overusing API Calls");
						 }
						 if (props.lockout === false){
							props.handleenter(event.target.value)
							props.setLockout(true)
						 }
						 setTimeout(function() { props.setLockout(false)}, 5000);
						 
						 
					}
				  }}
				//onChange={(event) => props.setSearchValue(event.target.value)}		
				placeholder='Type to search movies by title'
			></input>
			
			

			<p>
                <label for="dog-names">Filters:</label>
                <select name="grade-options" 
				id="grade-options"
				onChange={(event) => {
					props.setfilterValue(event.target.value)
				  }
				}
				>
                    <option >Language</option>
                    <option >Country</option>
                    <option >Rating</option>
                    <option>Year</option>
                    <option >Writer</option>
                </select>

            </p>
			

			<input
				className='form-control'
				onKeyPress={(event) => {
					if (event.key === "Enter" ) {
					props.filterMovies(event.target.value)
					
					}
				  }}
				//onChange={(event) => props.setSearchValue(event.target.value)}		
				placeholder='Type to search by a specific filter'
			></input>
		</div>
	);
};

export default Searchbar;