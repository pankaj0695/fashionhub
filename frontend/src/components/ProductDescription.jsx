function ProductDescription() {
  return (
    <div className='mt-20'>
      <div className='flex gap-3 mb-4'>
        <button className='btn_dark_rounded !rounded-none !test-xs !py-[6px] w-36'>
          Description
        </button>
        <button className='btn_dark_outline !rounded-none !test-xs !py-[6px] w-36'>
          Care Guide
        </button>
        <button className='btn_dark_outline !rounded-none !test-xs !py-[6px] w-36'>
          Size Guide
        </button>
      </div>
      <div className='flex flex-col pb-16'>
        <p className='text-sm'>
          Discover the epitome of style and comfort with our latest collection
          of men's slim-fit jeans. Crafted from a premium blend of cotton and
          elastane, these jeans offer a perfect balance of softness and stretch,
          ensuring you stay comfortable throughout the day. The contemporary
          design features a classic five-pocket style, a zip fly with button
          closure, and subtle distressed detailing for a modern, worn-in look.
        </p>
        <p className='text-sm'>
          Elevate your wardrobe with this essential piece that combines
          durability and fashion. Our slim-fit jeans are designed to complement
          a variety of body types, providing a flattering silhouette that moves
          with you. The meticulously stitched seams and reinforced pockets add
          to the jeans' longevity, making them a reliable addition to your
          closet.
        </p>
      </div>
    </div>
  );
}

export default ProductDescription;
