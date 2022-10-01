import Modal from "../shared/Modals/Modal";

type MicPermissionProps = {
  micPermissionNotGranted: boolean;
}
const permissionTitle = "Sorry. I cannot hear you 👂🏼"; 
const modalMessage = "This app needs access to the microphone to work. Give the app permissions and then restart. Click here if you need help.";

export function MicPermission({ micPermissionNotGranted }: MicPermissionProps): JSX.Element {
  return (
    <>
      {micPermissionNotGranted && (
        <Modal title={permissionTitle} message={modalMessage}></Modal>
      )}
    </>
  );
}
