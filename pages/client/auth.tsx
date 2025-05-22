import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      if (isLogin) {
        if (!formData.email || !formData.password) {
          setError("Veuillez remplir tous les champs !");
          setLoading(false);
          return;
        }

        const response = await axios.post("http://localhost:4000/graphql", {
          query: `
            mutation Login($input: LoginInput!) {
              login(input: $input)
            }
          `,
          variables: {
            input: {
              email: formData.email,
              password: formData.password,
            },
          },
        });

        if (response.data.data.login) {
          setMessage(response.data.data.login);
          setTimeout(() => {
            router.push("/client/home");
          }, 1500);
        }
      } else {
        const requiredFields = [
          formData.firstName,
          formData.lastName,
          formData.address,
          formData.phoneNumber,
          formData.email,
          formData.password,
          formData.confirmPassword,
        ];

        if (requiredFields.some((field) => !field)) {
          setError("Veuillez remplir tous les champs !");
          setLoading(false);
          return;
        }

        if (formData.password !== formData.confirmPassword) {
          setError("Les mots de passe ne correspondent pas !");
          setLoading(false);
          return;
        }

        if (!/^\d{8}$/.test(formData.phoneNumber)) {
          setError("Numéro de téléphone invalide (8 chiffres requis)");
          setLoading(false);
          return;
        }

        const response = await axios.post("http://localhost:4000/graphql", {
          query: `
            mutation CreateUser($input: CreateUserInput!) {
              createUser(input: $input) {
                message
                user {
                  email
                  firstName
                  lastName
                }
              }
            }
          `,
          variables: {
            input: {
              firstName: formData.firstName,
              lastName: formData.lastName,
              address: formData.address,
              phoneNumber: formData.phoneNumber,
              email: formData.email,
              password: formData.password,
            },
          },
        });

        if (response.data.data.createUser.message) {
          setMessage(response.data.data.createUser.message);
          setTimeout(() => {
            router.push("/client/home");
          }, 1500);
        }
      }
    } catch (err: any) {
      setError(
        err.response?.data?.errors?.[0]?.message ||
          "Une erreur est survenue. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Connexion" : "Inscription"}
        </h2>
        {message && <p className="text-green-600 text-center">{message}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
        {loading && <p className="text-blue-600 text-center">Chargement...</p>}

        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700">Adresse</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>

              <div>
                <label className="block text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  pattern="\d{8}"
                  title="8 chiffres requis"
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-gray-700">Confirmation</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring focus:ring-blue-300"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLogin ? "Se connecter" : "S'inscrire"}
          </button>
        </form>

        {isLogin && (
          <div className="text-right mt-2">
            <button
              onClick={() => alert("Un email de réinitialisation a été envoyé !")}
              className="text-blue-600 text-sm hover:underline"
            >
              Mot de passe oublié ?
            </button>
          </div>
        )}

        <div className="text-center mt-4">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setFormData({
                firstName: "",
                lastName: "",
                address: "",
                phoneNumber: "",
                email: "",
                password: "",
                confirmPassword: "",
              });
              setMessage("");
              setError("");
            }}
            className="text-blue-600 text-sm hover:underline"
          >
            {isLogin ? "Créer un compte" : "Déjà un compte ? Se connecter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;