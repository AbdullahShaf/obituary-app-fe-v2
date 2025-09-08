'use-client'

import Link from 'next/link'
import {
    Navbar,
    NavbarBrand,
    NavbarOffcanvas,
    NavbarToggle,
    OffcanvasBody,
    OffcanvasHeader,
    OffcanvasTitle,
} from 'react-bootstrap'
import NavBarLink from '../public/NavBarLink'
import NavBarLink2 from '../public/NavBarLink2'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Header = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false) // State to control offcanvas

    const handleSearchClick = () => {
        openSearchModal()
    }

    const fetchServices = async () => {
        showLoader()
        try {
            const { data } = await getCategories()
            setServices(data.result)
        } catch (error) {
            console.log('DropdownMenu => FetchServices', error)
        } finally {
            closeLoader()
        }
    }

    useEffect(() => {
        fetchServices()
    }, [])

    // Function to close offcanvas
    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false)
    }

    // scrool of for the page when canvas is open in movbile:
    useEffect(() => {
        if (showOffcanvas) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }

        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [showOffcanvas])

    return (
        <>
            {/* Mobile */}
            <section className="container-fluid ">
                <section className="container-lg">
                    <Navbar expand="lg" className="align-items-end">
                        <NavbarBrand className="navbar-brand py-0">
                            <Link className="me-md-5" href="/">
                            </Link>
                        </NavbarBrand>
                        <div className="d-block d-lg-none">
                            <Search className="fs-ss-18 text-dark cursor-pointer me-4" onClick={handleSearchClick} />
                            <NavbarToggle
                                aria-controls={`offcanvasNavbar-expand-xl`}
                                className="border-0 rounded-0 toggle-icon p-0"
                                onClick={() => setShowOffcanvas(true)} // Open offcanvas
                            />
                        </div>
                        <NavbarOffcanvas
                            show={showOffcanvas} // Controlled by state
                            onHide={handleCloseOffcanvas} // Close offcanvas
                            id={`offcanvasNavbar-expand-xl`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
                            placement="start"
                            className="navbar-offcanvas bg-ss-secondary"
                            scroll={true}
                            backdrop={true} // Changed to true for better UX
                        >
                            <OffcanvasHeader
                                id="offcanvas-close-button"
                                closeButton
                                className="border-1 border-white border-bottom mx-4 px-0 pb-2"
                            >
                                <OffcanvasTitle className="" id={`offcanvasNavbarLabel-expand-xl`}>
                                    <Link className="" href="/" onClick={handleCloseOffcanvas}>
                                    </Link>
                                </OffcanvasTitle>
                            </OffcanvasHeader>
                            <OffcanvasBody>
                                <ul id="main-menu" className="navbar-nav mx-md-auto d-block d-lg-none mt-4">
                                    <NavBarLink Name="Home" Link_To="/" onLinkClick={handleCloseOffcanvas} />
                                    <NavBarLink Name="About Us" Link_To="about-us" onLinkClick={handleCloseOffcanvas} />
                                    <NavBarLink Name="Services" Link_To="services" onLinkClick={handleCloseOffcanvas} />
                                    <NavBarLink Name="Renovations" Link_To="renovations" onLinkClick={handleCloseOffcanvas} />
                                    <NavBarLink
                                        Name="Digital Marketing"
                                        Link_To="digital-marketing"
                                        onLinkClick={handleCloseOffcanvas}
                                    />
                                    <NavBarLink Name="FAQs" Link_To="faqs" onLinkClick={handleCloseOffcanvas} />
                                    <NavBarLink
                                        Name="Contact Us"
                                        Link_To="contact-us"
                                        onLinkClick={handleCloseOffcanvas}
                                    />
                                    <div className="mt-2 d-block d-lg-none" />
                                </ul>

                                <ul id="search-and-profile" className="navbar-nav ms-lg-auto">
                                    <div className="d-none d-lg-flex align-items-center">
                                        <div className="d-flex px-4">
                                            <Link className="nav-link px-lg-4 mx-2 mx-lg-0 py-lg-3 fw-500" href="/" onClick={handleCloseOffcanvas}>Home</Link>
                                            <Link className="nav-link px-lg-4 mx-2 mx-lg-0 py-lg-3 fw-500" href="/about-us" onClick={handleCloseOffcanvas}>About Us</Link>
                                            <Link className="nav-link px-lg-4 mx-2 mx-lg-0 py-lg-3 fw-500" href="/contact-us" onClick={handleCloseOffcanvas}>Contact Us</Link>
                                        </div>
                                        <div id="search-icon" className="">
                                            <Search
                                                className="fs-ss-18 text-dark cursor-pointer"
                                                onClick={handleSearchClick}
                                            />
                                        </div>
                                        <div className="mt-2 mt-lg-0 mx-2 mx-md-0" />
                                    </div>
                                </ul>
                            </OffcanvasBody>
                        </NavbarOffcanvas>
                    </Navbar>
                </section>
            </section>

            {/* Desktop */}
            <section className="container-fluid bg-ss-primary d-none d-lg-block">
                <Navbar expand="lg" className="py-0">
                    <NavbarOffcanvas
                        id={`offcanvasNavbar-expand-xl`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
                        placement="start"
                        className="navbar-offcanvas"
                        scroll={true}
                        backdrop={false}
                    >
                        <OffcanvasHeader closeButton className="">
                            <OffcanvasTitle className="" id={`offcanvasNavbarLabel-expand-xl`}>
                                <Link className="" href="/">
                                    <Image src={Logo} alt="Logo" className="offcanvas-logo" />
                                </Link>
                            </OffcanvasTitle>
                        </OffcanvasHeader>
                        <OffcanvasBody>
                            <ul className="navbar-nav mx-md-auto ">
                                <NavBarLink Name="Renovations" Link_To="renovations" />
                                <NavBarLink Name="Digital Marketing" Link_To="digital-marketing" />
                            </ul>
                        </OffcanvasBody>
                    </NavbarOffcanvas>
                </Navbar>
            </section>
        </>
    )
}

export default Header
