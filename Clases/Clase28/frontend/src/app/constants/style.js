const styles = {
  boxWidth: "w-full lg:max-w-[1280px]",

  heading2: "font-poppins font-semibold text-[28px] sm:text-[30px] md:text-[36px] lg:text-[40px] xl:text-[44px] text-white ss:leading-[50px] xl:leading-[70px] leading-[30px] w-full",
  paragraph: "font-poppins font-normal text-dimWhite text-[16x] xl:text-[18px] leading-[30px]",

  flexCenter: "flex justify-center items-center",
  flexStart: "flex justify-center items-start",
  flexStartHero: "flex justify-center md:justify-start md:mt-4 xl:mt-0 xl:justify-center items-start",

  paddingX: "sm:px-16 px-6",
  paddingY: "py-6 lg:py-0 xl:py-16",
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  marginX: "sm:mx-16 mx-6",
  marginY: "sm:my-16 my-6",
};

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
};

export default styles;
