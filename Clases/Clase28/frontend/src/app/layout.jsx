import { Poppins } from '@next/font/google'
import styles from '@/styles/global.css'
import { lazy, Suspense } from "react"

const font = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ['400', '600']
})

// const Footer = lazy(() => import('./components/Footer'))

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body className={`${font.variable} bg-primary`}>
        {/* <NavBar /> */}
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <main className='p-6'>{children}</main>
            <Suspense fallback={`Loading...`}>
              {/* <Footer /> */}
            </Suspense>
          </div>
        </div>
      </body>
    </html>
  )
}
