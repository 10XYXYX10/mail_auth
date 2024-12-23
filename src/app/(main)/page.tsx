import Image from "next/image";

const MainPage = async () => {

  return (
    <div>
        <div className="p-3 flex justify-center">
          <Image
            className="overflow-hidden rounded-full"
            src='/loneProgrammer_square.jpg'
            width='500'
            height='500'
            alt="lone_programmer"
          />          
        </div>
    </div>
  )
}

export default MainPage;
