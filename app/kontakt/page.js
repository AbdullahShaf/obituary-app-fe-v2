import ContactFormPage from "../components/appcomponents/ContactFormPage";
import Layout from "../components/appcomponents/Layout";

export const metadata = {
  title: "Kontakt | Osmrtnica",
  description: "Kontaktirajte nas za vprašanja, podporo ali dodatne informacije o storitvah Osmrtnica.com. Na voljo smo vam za pomoč pri izdelavi osmrtnic, spominskih strani in QR kod za nagrobnike.",
  robots: "index, follow",
};

const ContactForm = () => {
  return (
    <>

      <Layout from={"18"} forFooter={"memorypage"} currentPage="">
        <div className="flex flex-1  flex-col bg-[#F5F7F9]">
          {/* <HeaderRegistration/> */}
          <ContactFormPage />
        </div>
      </Layout>
    </>
  );
};

export default ContactForm;
