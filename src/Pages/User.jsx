import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const User = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const db = getFirestore();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
            setError("");
          } else {
            setError("No user data found.");
            setUserData(null);
          }
        } catch (err) {
          console.error("Error getting user data:", err);
          setError("Something went wrong while fetching data.");
          setUserData(null);
        }
      } else {
        // User is not logged in but wait until this check completes
        setUserData(null);
        setError("User not logged in.");
      }
      setLoading(false);  // loading ends here after user check
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-600 text-center">{error}</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <p><strong>Name:</strong> {userData.userName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>UID:</strong> {userData.uid}</p>
      <p><strong>Role:</strong> {userData.role}</p>
    </div>
  );
};

export default User;
