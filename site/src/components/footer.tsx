"use client"

import Link from "next/link"

const Footer = () => {

    return (
        <footer className="w-full border-t">
            <div className="container mx-auto flex flex-col gap-4 px-6 py-10 items-center justify-center">
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full">
                    <div className="space-y-4 ">
                        <div className="flex items-center gap-2 font-bold">
                            <span>Capital Wave Studio</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Elevate your sound with Capital Wave Studio, Victoria‘s premier music studio turned record label. Join us to transform your musical vision into reality.
                        </p>
                        <div className="flex gap-4">
                            <Link
                                href="https://www.instagram.com/capitalwavestudio/"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">Instagram</span>
                            </Link>

                            <Link
                                href="https://www.instagram.com/capitalwavestudio/"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path d="M19.615 3.184C21.2 3.615 22.385 4.8 22.816 6.385C23.333 8.385 23.333 12 23.333 12C23.333 12 23.333 15.615 22.816 17.615C22.385 19.2 21.2 20.385 19.615 20.816C17.615 21.333 12 21.333 12 21.333C12 21.333 6.385 21.333 4.385 20.816C2.8 20.385 1.615 19.2 1.184 17.615C0.667 15.615 0.667 12 0.667 12C0.667 12 0.667 8.385 1.184 6.385C1.615 4.8 2.8 3.615 4.385 3.184C6.385 2.667 12 2.667 12 2.667C12 2.667 17.615 2.667 19.615 3.184ZM9.833 8.833V15.167L15.167 12L9.833 8.833Z" />
                                </svg>
                                <span className="sr-only">YouTube</span>
                            </Link>

                            <Link
                                href="https://www.instagram.com/capitalwavestudio/"
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path fillRule="evenodd" d="M19.321 5.562a5.109 5.109 0 0 1 -0.443 -0.258 6.234 6.234 0 0 1 -1.138 -0.967c-0.848 -0.971 -1.165 -1.956 -1.282 -2.645h0.005C16.366 1.12 16.406 0.75 16.412 0.75h-3.864v14.943c0 0.201 0 0.399 -0.008 0.595 0 0.024 -0.002 0.047 -0.004 0.073 0 0.011 0 0.022 -0.002 0.033v0.008a3.281 3.281 0 0 1 -1.651 2.604 3.225 3.225 0 0 1 -1.599 0.422c-1.8 0 -3.26 -1.468 -3.26 -3.281s1.459 -3.281 3.26 -3.281a3.23 3.23 0 0 1 1.004 0.159l0.005 -3.935a7.178 7.178 0 0 0 -5.531 1.618 7.584 7.584 0 0 0 -1.655 2.04c-0.163 0.281 -0.779 1.411 -0.853 3.246 -0.047 1.041 0.266 2.12 0.415 2.565v0.009c0.094 0.262 0.457 1.158 1.049 1.913A7.852 7.852 0 0 0 5.391 22.062v-0.009l0.009 0.009c1.871 1.271 3.945 1.188 3.945 1.188 0.359 -0.015 1.562 0 2.928 -0.647 1.515 -0.718 2.377 -1.787 2.377 -1.787a7.43 7.43 0 0 0 1.296 -2.153c0.35 -0.919 0.466 -2.022 0.466 -2.462V8.273c0.047 0.028 0.671 0.441 0.671 0.441s0.9 0.577 2.303 0.952c1.007 0.267 2.363 0.323 2.363 0.323v-3.836c-0.475 0.052 -1.44 -0.098 -2.429 -0.591" clipRule="evenodd" />
                                </svg>
                                <span className="sr-only">TikTok</span>
                            </Link>

                        </div>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold">
                            <Link href="/services" className="text-foreground hover:text-blue-500 transition-colors">
                                Services
                            </Link>
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Professional Audio Recording
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Video Production and Editing
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Graphic Design
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Artist Development
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold">
                            <Link href="/roster" className="text-foreground hover:text-blue-500 transition-colors">
                                Roster
                            </Link>
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Engineers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Artists
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Videographers & Editors
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Management
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold">
                            <Link href="/events" className="text-foreground hover:text-blue-500 transition-colors">
                                Events
                            </Link>
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Upcoming Shows
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Past Events
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Promotional Materials
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                    Work With Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row justify-center items-center border-t border-border/40 pt-8 w-full text-center">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Capital Wave. All rights reserved.
                    </p>
                    {/* <div className="flex gap-4 justify-center">
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
            </div> */}
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center w-full text-center">
                    <p className="text-xs text-muted-foreground">
                        Website designed with care by <Link href="https://jeetzingh.com" className="text-blue-500 hover:underline">JEETZINGH</Link>
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer