
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../../contexts/AppContext";

const Result = () => {

  const [image, setimage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const { generate_image ,credits} = useContext(AppContext);
  const onsubmithandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setIsImageLoaded(false);
    try {
      const generatedImage = await generate_image(input);
      if (generatedImage) {
        setimage(generatedImage);
        setIsImageLoaded(false);
      }
      console.log("Image generated successfully:", generatedImage);
    } catch (error) {
      console.error("Error generating image:", error);
      alert("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
    onSubmit={onsubmithandler}
      action="" className="flex flex-col min-h-[90vh] items-center">
      
      <div>
        <div className="relative">
          <img src={image} alt="" className=" max-w-sm rounded" />
          <span
  className={`absolute bottom-0 left-0 h-1 bg-blue-500 
    ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`}
/>

        </div>
        <p className={ !loading? "hidden":""} >Loading.....</p>
      </div>
     { isImageLoaded  && 
<div
        className=" flex w-full max-w-xl bg-neutral-500 text-white
      text-sm rounded-full p-o.5 mt-10 "
      >
          <input
            onChange={(e) => setInput(e.target.value)}
            
          value={input}
          type="text"
          placeholder="Describe what you want to generate"
          className="
         flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
        />
          <button
          

          type="submit"
          className=" bg-zinc-900 px-10 sm:px-16 py-3 rounded-full "
        >
          Generate
        </button>
      </div>
      }
      { !isImageLoaded  && 
<div
        className="flex gap-2 flex-wrap justify-center text-white
text-sm p-0.5 mt-10 rounded-full"
      >
          <p
            onClick={()=> setIsImageLoaded(true)}
          className="bg-transparent border border-zinc-900
text-black px-8 py-3 rounded-full cursor-pointer "
        >
          Generate Another
        </p>
        <a
          href={image}
          download
          className="bg-zinc-900 px-10 py-3
rounded-full cursor-pointer"
        >
          Download
        </a>
      </div>
      }

      
    </form>
  );
};

export default Result;
