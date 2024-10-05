import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAutContext";

const UpdateVendorProfile = () => {
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [id, setid] = useState(null);
  const [password, setPassword] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch(
        `http://localhost:5133/api/vendor/${user.vendor.id}`
      );
      const json = await response.json();
      console.log(json);

      if (response.ok) {

        setPassword(json.passwordHash);
        setid(json.id);
        setEmail(json.email);
        setUsername(json.username);
      }
    };
    fetchProfile();
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5133/api/vendor/${user.vendor.id}`,
        {
          method: "PUT", // Changed PATCH to PUT
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            email,
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        setError(null);
        setEmptyFields([]);
        console.log("Update successful!");
      } else {
        const json = await response.json();
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <br></br>
      <div>
        <form onSubmit={handleUpdate}>
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username || ""}
            className={emptyFields.includes("username") ? "error" : ""}
          />
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
            
          />

          <button className="btnSubmit" type="submit">
            Update
          </button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default UpdateVendorProfile;
