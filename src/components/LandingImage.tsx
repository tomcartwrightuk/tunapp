import landingImage from "../assets/landing-image.jpg";

type LandingImageProps = {
  show: boolean;
};

function LandingImage({ show }: LandingImageProps) {
  return (
    <>
      {show && (
        <img style={{width: "400px"}} src={landingImage} alt="An image of a tuna fish playing a guitar" />
      )}
    </>
  );
}

export default LandingImage;
