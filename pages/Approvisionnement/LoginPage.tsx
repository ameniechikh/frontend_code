import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "Approvisionnement@smartsteel.com" && password === "Approvisionnement") {
      router.push("/Approvisionnement/Dashboard");
    } else {
      alert("Email ou mot de passe incorrect !");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#DCE7FF]">
      <div className="bg-white p-6 rounded-2xl shadow-lg flex w-[600px]">
        {/* Image Section */}
        <div className="w-1/2 flex justify-center items-center bg-gray-100 rounded-l-2xl">
          <img src="/bb.jpg" alt="Login Illustration" className="w-150 h-150" />
        </div>

        {/* Form Section */}
        <div className="w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center mb-2">Sign In</h2>
         
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-2 border rounded mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full p-2 border rounded mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
              Sign In
            </button>
          </form>
          <button className="w-full mt-3 border p-2 rounded"></button>
        </div>
      </div>
    </div>
  );
};

export default Login;
