import http from "../API/api";

const Registration = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await http.post("/auth", {
      email: e.target.email.value,
      password: e.target.password.value,
    });

    if (response.data.success) {
      console.log(response.data);
    } else {
      console.log(response.data);
    }
  };

  return (
    <div className="">
      <form className="grid w-2xl p-5" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" required className="border py-1 px-2" defaultValue="admin@gmail.com" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required className="border py-1 px-2" defaultValue="password" />
        <button type="submit" className="">
          SUBMIT
        </button>
      </form>
    </div>
  );
};

export default Registration;
