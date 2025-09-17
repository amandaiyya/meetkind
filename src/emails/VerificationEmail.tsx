import {
    Body,
    Html,
} from "@react-email/components";

interface VerificationEmailProps {
    username: string;
    verifyCode: string;
}
  
export default function VerificationEmail({ username, verifyCode }: VerificationEmailProps) {
    return (
    <Html>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Abel&family=Krub:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
      </style>

      <Body style={{ margin: 0, padding: 0, backgroundColor: "gainsboro" }}>
        {/* Outer full-width wrapper */}
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: "gainsboro", width: "100%" }}
        >
          <tbody>
            <tr>
              <td align="center" style={{ padding: "50px 15px" }}>
                {/* Inner centered card (max-width 450px) */}
                <table
                  role="presentation"
                  width="450"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    height: "400px",
                    width: "100%",
                    maxWidth: "450px",
                    backgroundColor: "#FFD60A",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    {/* Logo row */}
                    <tr>
                      <td style={{ padding: "15px" }}>
                        <img
                          src={'/meetkind.svg'}
                          width="70"
                          height="auto"
                          alt="Meetkind"
                          style={{ display: "block", border: "0", outline: "none", textDecoration: "none" }}
                        />
                      </td>
                    </tr>

                    {/* Greeting + description */}
                    <tr style={{}}>
                      <td style={{ padding: "0 15px 10px 15px", textAlign: "center" }}>
                        <p
                          style={{
                            margin: 0,
                            fontFamily: "Krub, Verdana, sans-serif",
                            fontSize: "25px",
                            lineHeight: "32px",
                            fontWeight: 500,
                          }}
                        >
                          Hi {username},
                        </p>
                        <p
                          style={{
                            margin: "8px 0 0 0",
                            fontFamily: "Krub, Verdana, sans-serif",
                            fontSize: "22px",
                            fontWeight: 500,
                            lineHeight: "24px",
                          }}
                        >
                          Verify your Account with this code.
                        </p>
                      </td>
                    </tr>

                    {/* Code box */}
                    <tr>
                      <td align="center" style={{ padding: "16px 15px 20px 15px" }}>
                        <table
                          role="presentation"
                          width="360"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{
                            width: "100%",
                            maxWidth: "360px",
                            backgroundColor: "#FFC300",
                            borderRadius: "4px",
                            borderCollapse: "collapse",
                          }}
                        >
                          <tbody>
                            <tr>
                              <td align="center" style={{ padding: "18px 10px" }}>
                                <p
                                  style={{
                                    margin: 0,
                                    fontFamily: "Abel, Verdana, sans-serif",
                                    fontSize: "40px",
                                    fontWeight: 500,
                                    lineHeight: "44px",
                                    letterSpacing: "4px",
                                  }}
                                >
                                  {verifyCode}
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td style={{ padding: "10px 15px 20px 15px", textAlign: "center" }}>
                        <table role="presentation" cellPadding={0} cellSpacing={0} style={{ margin: "0 auto" }}>
                          <tbody>
                            <tr>
                              <td style={{ verticalAlign: "middle", paddingRight: "8px" }}>
                                <img
                                  src={'/meetkind.svg'}
                                  width="42"
                                  height="32"
                                  alt=""
                                  style={{ display: "block", border: 0 }}
                                />
                              </td>
                              <td style={{ verticalAlign: "middle" }}>
                                <a
                                  href="https://yourdomain.com"
                                  style={{
                                    display: "inline-block",
                                    padding: "3px 10px",
                                    backgroundColor: "#003566",
                                    color: "#FFD60A",
                                    textDecoration: "none",
                                    borderRadius: "3px",
                                    border: "1px solid #001D3D",
                                    fontFamily: "Krub, Verdana, sans-serif",
                                    fontSize: "13px",
                                    fontWeight: 500,
                                  }}
                                >
                                  Visit
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <p
                          style={{
                            margin: "12px 0 0 0",
                            fontFamily: "Krub, Verdana, sans-serif",
                            fontSize: "12px",
                            fontWeight: 400,
                            color: "#000",
                          }}
                        >
                          © 2025 meetkind. All rights reserved
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* end inner card */}
              </td>
            </tr>
          </tbody>
        </table>
      </Body>
    </Html>
    )
}