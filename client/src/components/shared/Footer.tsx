import appStore from "../../assets/images/AppStore.png";
import googlePlay from "../../assets/images/google-play.png";
import qrCode from "../../assets/images/Qr-Code.png";
import { BiLogoFacebook } from "react-icons/bi";
import { RiTwitterXFill, RiLinkedinLine } from "react-icons/ri";
import { AiOutlineInstagram } from "react-icons/ai";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-black pt-[80px] max-w-[1920px] mx-auto">
      <div className="grid grid-cols-5 gap-[87px] page-container text-white">
        {/* COLUMN-1 */}
        <div>
          <div className="flex flex-col gap-[24px]">
            <h1 className="text-xl font-semibold">Exclusive</h1>
            <p className="font-medium">Subscribe</p>
            <p>Get 10% off your first order</p>
            <img src={qrCode} alt="qrCode" />
          </div>
        </div>

        {/* COLUMN-2 */}
        <div>
          <h1 className="mb-[24px] text-[20px] font-semibold">Support</h1>
          <ul className="flex flex-col gap-[16px]">
            <li>111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
            <li>exclusive@gmail.com</li>
            <li>+88015-88888-9999</li>
          </ul>
        </div>

        {/* COLUMN-3 */}
        <div>
          <h1 className="mb-[24px] text-[20px] font-semibold">Account</h1>
          <ul className="flex flex-col gap-[16px]">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* COLUMN-4 */}
        <div>
          <h1 className="mb-[24px] text-[20px] font-semibold">Quick Link</h1>
          <ul className="flex flex-col gap-[16px]">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* COLUMN-5 */}
        <div>
          <h1 className="mb-[24px] text-[20px] font-semibold">Download App</h1>
          <div>
            <p className="opacity-60 text-sm">Save $3 with App New User Only</p>
            <div className="flex items-center gap-[8px] mt-[10px]">
              <div className="flex flex-col gap-2">
                <img src={googlePlay} alt="qrCode" />
                <img src={appStore} alt="qrCode" />
              </div>
            </div>
            <div className="mt-[10px] flex items-center gap-5">
              <BiLogoFacebook size={25} />
              <RiTwitterXFill size={25} />
              <AiOutlineInstagram size={25} />
              <RiLinkedinLine size={25} />
            </div>
          </div>
        </div>
      </div>

      <Separator className="mt-[60px] mb-4 opacity-20" />

      <div className="text-white opacity-60 text-center pb-[24px]">
        Copyright NMT 2024. All right reserved
      </div>
    </footer>
  );
};

export default Footer;
