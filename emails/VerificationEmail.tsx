import envConfig from "@/lib/envConfig";

interface VerificationEmailProps {
    username: string;
    verifyCode: string;
}
  
export default function VerificationEmail({ username, verifyCode }: VerificationEmailProps) {
    return (
    <html>
      <body style={{fontFamily: "Krub, Verdana, sans-serif", margin: "0"}}>
        <div style={container}>
            <section>
              <img width="70px" src={`${envConfig.baseUrl}/meetkind.svg`} alt="meetkind"/>
            </section>
            <section style={middlebox}>
              <div style={{textAlign: "center", marginBottom: "25px"}}>
                <p style={{margin: "0", marginBottom: "15px", fontSize: "28px", color: "#001D3D !important"}} data-ogsc>Hii {username}</p>
                <p style={{margin: "0", fontSize: "25px", color: "#001D3D !important"}} data-ogsc>Verify your Account with this code.</p>
              </div>
              <div style={{backgroundColor: "#FFC300", textAlign: "center"}}>
                <div style={{padding: "20px 0", fontSize: "45px", color: "#001D3D !important"}} data-ogsc>{verifyCode}</div>
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
}

const middlebox = {
  width: "100%",
  margin: "50px 0 25px 0",
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

VerificationEmail.PreviewProps = {
  username: "Akshay",
  verifyCode: "123456",
};