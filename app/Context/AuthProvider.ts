// import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
// import { getAccessToken } from "@/lib/spotify/auth";

// interface AuthContextType {
//   accessToken: string | null;
//   refresh: () => Promise<void>;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   const fetchToken = async () => {
//     setLoading(true);
//     const token = await getAccessToken();
//     setAccessToken(token);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchToken();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ accessToken, refresh: fetchToken, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// }
