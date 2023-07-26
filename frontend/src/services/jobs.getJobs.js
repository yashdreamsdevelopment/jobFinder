const getAllJobs = async ({ token }) => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/jobs/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export default getAllJobs;
