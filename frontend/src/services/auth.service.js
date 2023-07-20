

const login = async (formData) => {
    const response = await fetch("http://localhost:3000/api/v1/user/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        type: "cors",
        body: JSON.stringify(formData),
    });

    const data = await response.json();

    return data;
}

export default {
    login
}