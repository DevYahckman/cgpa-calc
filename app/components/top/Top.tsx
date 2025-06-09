import backGround from "@/app/assets/imgs/top.png";

interface Props{
    heading?:String
    subHeading?:String
}

const Top = ({heading, subHeading}:Props) => {
  return (
    <div className="">
      <div
        className="bg-center bg-cover h-72 text-center flex flex-col justify-center items-center text-white space-y-3 "
        style={{ backgroundImage: `url(${backGround.src})` }}
      >
        <p className="font-bold text-3xl">{heading}</p>
        <p className="text-sm">
          {subHeading}
        </p>
      </div>
    </div>
  );
};

export default Top;
