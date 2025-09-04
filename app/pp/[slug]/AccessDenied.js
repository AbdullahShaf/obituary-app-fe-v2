import Layout from "@/app/components/appcomponents/Layout";

export function AccessDenied() {
    return (
        <Layout
                megaMenu={""}
                isMegaMenuVisible={false}
                from={"18"}
                currentPage=""
                forFooter={"memorypage"}
              >
                <div className="flex flex-1 flex-col bg-[#F5F7F9] items-center justify-center min-h-screen">
                  <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      <h2 className="text-xl font-bold mb-2">Access Denied</h2>
                      {/* <p>{"You don't have permission to create obituaries."}</p> */}
                      <p className="text-sm mt-2">Please contact your administrator.</p>
                    </div>
                    <button
                      onClick={() => router.push("/")}
                      className="bg-[#0A85C2] text-white px-6 py-2 rounded hover:bg-[#1860A3]"
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </Layout>
    );
}
