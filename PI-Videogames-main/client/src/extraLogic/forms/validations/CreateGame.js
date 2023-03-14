export default function validate(input){
	const format = input.image.split(".").pop()
	const name = /^[A-Za-z][A-Za-z0-9- ]{0,59}$/;
	const errors={};
	
	if(!input.name.length){
	errors.name="min length of 1 caracter"
	}else if(input.name.length>60){
	errors.name="max length of 25 caracters"
	}else if(!name.test(input.name)){
	errors.name="Only Alphanumeric are allowed."
	}
	if(!input.genres.length){
	errors.genres="You must choose at least one."
	}
	if(!input.platforms.length){
        errors.platforms="You must choose at least one."
        }
	if(!input.release_date.length){
	errors.release_date="Complete this field."
	}
	if(input.description.length<10){
	errors.description="min length of 10 caracters."
	}
	if(input.description.length>500){
	errors.description="max length of 500 caracters."
	}
	if(format !== "png" &&  format !== "jpg" && format !== "jpeg"){
	errors.image="Only .png, jpg, jpeg, are valid."
	}
	return errors
}
/*{
    "name": "SegundoJuego",
    "description": "descripcion",
    "platforms": [
        "Xbox",
        "Play"
    ],
    "image": "Url",
    "release_date": "22-06-2016",
    "rating": 4.5,
    "genres": [
        6,
        4,
        2
    ]
}*/
