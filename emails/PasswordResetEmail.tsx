import envConfig from "@/lib/envConfig";

interface PasswordResetEmailProps {
    id: string;
    username: string;
    token: string;
}
  
export default function PasswordResetEmail({id, username, token }: PasswordResetEmailProps) {
    return (
    <html>
      <body style={{fontFamily: "Krub, Verdana, sans-serif", margin: "0"}}>
        <div style={container}>
            <section>
              <img width="70px" src={`${envConfig.baseUrl}/meetkind.svg`} alt="meetkind"/>
            </section>
            <section style={middlebox}>
              <div style={{textAlign: "center", marginBottom: "25px"}}>
                <p style={{margin: "0", marginBottom: "15px", fontSize: "28px", color: "#001D3D !important"}} data-ogsc>Hii {username},</p>
                <p style={{margin: "0", fontSize: "25px", color: "#001D3D !important"}} data-ogsc>Reset your meetkind password</p>
              </div>
              <div style={{textAlign: "center", marginBottom: "25px"}}>
                <p style={{color: "#001D3D", padding: "0 30px"}}>if that below button doesn’t work, copy and paste the following link in your browser</p>
                <p style={{color: "#003566", padding: "0 30px", textDecoration: "underline"}}>{envConfig.baseUrl}/reset-password?id={id}&token={token}</p>
              </div>
              <div style={{textAlign: "center"}}>
                <a href={`${envConfig.baseUrl}/reset-password?id=${id}&token=${token}`} style={reset}>Reset Password</a>
              </div>
            </section>
            <section style={{margin: "15px 0"}}>
              <div style={{width: "100%", textAlign: "center", marginBottom: "10px"}}>
                <img width="42px" height="32px" style={img} src={`${envConfig.baseUrl}/meetkind.svg`} alt="meetkind" />
                <a href={envConfig.baseUrl} style={{...visit, color: "#FFD60A"}}>visit</a>
              </div>
              <p style={{margin: "0", textAlign: "center", color: "#001D3D !important"}} data-ogsc>
                © 2025 meetkind.  All rights reserved
              </p>
            </section>
        </div>
      </body>
    </html>
    
    )
}

const container = {
  backgroundColor: "#FFD60A",
  width: "100%",
  maxWidth: "450px",
  margin: "5px auto",
  padding: "15px",
  borderRadius: "10px",
}

const middlebox = {
  width: "100%",
  margin: "40px 0 40px 0",
}

const img = {
  display: "inline-block",
  veritcalAlign: "middle",
}

const visit = {
  display: "inline-block",
  verticalAlign: "middle",
  border: "1px solid #001D3D",
  borderRadius: "3px",
  padding: "2px 8px",
  backgroundColor: "#003566",
  color: "#FFD60A",
  textDecoration: "none",
}

const reset = {
    fontSize: "x-large",
    display: "inline-block",
    verticalAlign: "middle",
    border: "1px solid #001D3D",
    borderRadius: "3px",
    padding: "2px 8px",
    backgroundColor: "#FFC300",
    color: "#000",
    textDecoration: "none",
  }

PasswordResetEmail.PreviewProps = {
  username: "Akshay",
  resetCode: "123456",
};