import landingImage from "../assets/landing-image.jpg";

type LandingImageProps = {
  show: boolean;
};

const imageStyles = {
  width: "400px",
  marginTop: "64px"
}

function LandingImage({ show }: LandingImageProps) {
  return (
    <>
      {show && (
        <img style={imageStyles} src={landingImage} alt="An image of a tuna fish playing a guitar" />
      )}
    </>
  );
}

export default LandingImage;
