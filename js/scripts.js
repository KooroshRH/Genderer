function onSubmit()
{
    var name = document.getElementById("fname").value

    if(isNameValid(name))
    {
        predictGender(name)
    }
}

function isNameValid(name)
{
    if(name == null)
    {
        alert("Please insert a name")
        return false
    }

    if(name.length > 255)
    {
        alert("Please enter less than 255 character")
        return false
    }

    var filter = /^[a-zA-Z\s]+$/
    if(!filter.test(name))
    {
        alert("Please use only english letters and space")
        return false
    }
    return true
}

function predictGender(name)
{
    fetch('https://api.genderize.io/?name=' + name)
        .then(response => response.json())
        .then(data => 
            {
                var gender = data["gender"]
                var probability = data["probability"]
                if(gender == null)
                {
                    gender = "We can't predict your entered name, but you can save your guessed gender."
                    probability = null
                }
                document.getElementById("predictedGender").innerHTML = gender
                document.getElementById("predictionProbability").innerHTML = probability
                if(localStorage.getItem(name) != null)
                {
                    document.getElementById("savedAsnwer").innerHTML = localStorage.getItem(name)
                    document.getElementById("savedAnswerBox").style.visibility = 'visible'
                }
                else
                {
                    document.getElementById("savedAsnwer").innerHTML = null
                    document.getElementById("savedAnswerBox").style.visibility = 'hidden'
                }
            })
        .catch(error => 
        {
            console.log(error)
            document.getElementById("predictedGender").innerHTML = "Check your internet connection"
            document.getElementById("predictionProbability").innerHTML = null
        })
}

function saveGender()
{
    const radioButtons = document.querySelectorAll('input[name="gender"]');
    let selectedValue;
    for (const radio of radioButtons) {
        if (radio.checked) {
            selectedValue = radio.value;
            break;
        }
    }

    var name = document.getElementById("fname").value
    if(selectedValue == null || !isNameValid(name))
    {
        alert("Please insert information correctly")
        return
    }
    localStorage.setItem(name, selectedValue)
    document.getElementById("savedAsnwer").innerHTML = localStorage.getItem(name)
    document.getElementById("savedAnswerBox").style.visibility = 'visible'
}

function clearName()
{
    var name = document.getElementById("fname").value
    if(!isNameValid(name))
    {
        alert("Please insert information correctly")
        return
    }
    localStorage.removeItem(name)
    document.getElementById("savedAsnwer").innerHTML = null
    document.getElementById("savedAnswerBox").style.visibility = 'hidden'
}