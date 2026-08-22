import ContactOutro from "./ContactOutro";
import ContactTransition from "./ContactTransition";
import ProjectForm from "./ProjectForm/ProjectForm";

export default function ContactSection(){
    return(
        <section>
        <ContactTransition />
        <ProjectForm />
        <ContactOutro />

    </section>
    );
}