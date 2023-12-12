import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
    return (
        <footer className="text-white d-flex" style={{backgroundColor: "#110e66"}}>
            <div className="container p-4 pb-0 ">
                <section className="">
                    <a className="btn btn-outline-light btn-floating m-1" target={'_blank'} href="#!" role="button">
                        <FaFacebook className="mb-1" />
                    </a>

                    <a className="btn btn-outline-light btn-floating m-1" target={'_blank'} href="#!" role="button">
                        <FaInstagram className="mb-1" />
                    </a>

                    <a className="btn btn-outline-light btn-floating m-1" target={'_blank'} href="#!" role="button">
                        <FaTwitter className="mb-1" />
                    </a>
                </section>
            </div>

            <div className="text-center p-4">
                © {new Date().getFullYear()} Intellect Academy
            </div>
        </footer>
    )
}

export default Footer