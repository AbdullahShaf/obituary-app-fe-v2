"use client";
import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from '@nextui-org/react';
import { useAuth } from "@/hooks/useAuth";
import axios from '@/services/axios';
import toast from 'react-hot-toast';

// All major cities and municipalities in Slovenia
const SLOVENIAN_CITIES = [
  // Major cities
  { value: 'ljubljana', label: 'Ljubljana', population: 'large' },
  { value: 'maribor', label: 'Maribor', population: 'large' },
  { value: 'celje', label: 'Celje', population: 'large' },
  { value: 'kranj', label: 'Kranj', population: 'large' },
  { value: 'koper', label: 'Koper', population: 'large' },
  { value: 'novo_mesto', label: 'Novo mesto', population: 'large' },
  { value: 'velenje', label: 'Velenje', population: 'large' },
  { value: 'nova_gorica', label: 'Nova Gorica', population: 'large' },
  { value: 'ptuj', label: 'Ptuj', population: 'medium' },
  { value: 'kamnik', label: 'Kamnik', population: 'medium' },
  { value: 'trbovlje', label: 'Trbovlje', population: 'medium' },
  { value: 'domzale', label: 'Domžale', population: 'medium' },
  { value: 'jesenice', label: 'Jesenice', population: 'medium' },
  { value: 'murska_sobota', label: 'Murska Sobota', population: 'medium' },
  { value: 'slovenj_gradec', label: 'Slovenj Gradec', population: 'medium' },
  { value: 'skofja_loka', label: 'Škofja Loka', population: 'medium' },
  { value: 'gornja_radgona', label: 'Gornja Radgona', population: 'small' },
  { value: 'grosuplje', label: 'Grosuplje', population: 'small' },
  { value: 'hrastnik', label: 'Hrastnik', population: 'small' },
  { value: 'izola', label: 'Izola', population: 'small' },
  { value: 'idrija', label: 'Idrija', population: 'small' },
  { value: 'krsko', label: 'Krško', population: 'small' },
  { value: 'lendava', label: 'Lendava', population: 'small' },
  { value: 'litija', label: 'Litija', population: 'small' },
  { value: 'ljutomer', label: 'Ljutomer', population: 'small' },
  { value: 'logatec', label: 'Logatec', population: 'small' },
  { value: 'metlika', label: 'Metlika', population: 'small' },
  { value: 'mozirje', label: 'Mozirje', population: 'small' },
  { value: 'ormoz', label: 'Ormož', population: 'small' },
  { value: 'piran', label: 'Piran', population: 'small' },
  { value: 'postojna', label: 'Postojna', population: 'small' },
  { value: 'radece', label: 'Radeče', population: 'small' },
  { value: 'radovljica', label: 'Radovljica', population: 'small' },
  { value: 'ravne_na_koroskem', label: 'Ravne na Koroškem', population: 'small' },
  { value: 'ribnica', label: 'Ribnica', population: 'small' },
  { value: 'sencur', label: 'Šenčur', population: 'small' },
  { value: 'sentjur', label: 'Šentjur', population: 'small' },
  { value: 'sevnica', label: 'Sevnica', population: 'small' },
  { value: 'sezana', label: 'Sežana', population: 'small' },
  { value: 'slovenska_bistrica', label: 'Slovenska Bistrica', population: 'small' },
  { value: 'slovenj_gradec', label: 'Slovenj Gradec', population: 'small' },
  { value: 'smart_pri_litiji', label: 'Šmartno pri Litiji', population: 'small' },
  { value: 'tolmin', label: 'Tolmin', population: 'small' },
  { value: 'trebnje', label: 'Trebnje', population: 'small' },
  { value: 'trzic', label: 'Tržič', population: 'small' },
  { value: 'velika_lasce', label: 'Velika Lašče', population: 'small' },
  { value: 'videm', label: 'Videm', population: 'small' },
  { value: 'vrhnika', label: 'Vrhnika', population: 'small' },
  { value: 'zagorje_ob_savi', label: 'Zagorje ob Savi', population: 'small' },
  { value: 'zalec', label: 'Žalec', population: 'small' },
  { value: 'zelezniki', label: 'Železniki', population: 'small' },
  { value: 'ziri', label: 'Žiri', population: 'small' },
  { value: 'zrece', label: 'Zreče', population: 'small' },
].sort((a, b) => a.label.localeCompare(b.label, 'sl'));

const ADVERTISER_PAGES = [
  { value: 'obituaries', label: 'Osmrtnice' },
  { value: 'memory_pages', label: 'Spominske strani' },
  { value: 'homepage', label: 'Domača stran' }
];

const PaymentModal = ({ isOpen, onClose, packageType, onPaymentCreated, customCode }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: '',
    email: '',
    name: '',
    city: '',
    page: '',
    customCode: customCode || ''
  });

  // Update customCode when prop changes
  useEffect(() => {
    if (customCode) {
      setFormData(prev => ({ ...prev, customCode }));
    }
  }, [customCode]);

  const isMemoryPage = packageType?.startsWith('memory_page_');
  const isFlorist = packageType?.startsWith('florist_');
  const isAdvertiser = packageType?.startsWith('advertiser_');
  const isCustom = packageType?.startsWith('custom_');

  // Get modal title based on package type
  const getModalTitle = () => {
    if (isMemoryPage) return 'Spominska stran';
    if (isFlorist) return 'Naročnina za cvetličarno';
    if (isAdvertiser) return 'Oglaševanje';
    if (isCustom) return 'Prilagojeni paket';
    return 'Plačilo';
  };

  // Get modal description
  const getModalDescription = () => {
    if (isMemoryPage) return 'Vnesite podatke za aktivacijo spominske strani';
    if (isFlorist) return 'Potrdite svoj račun za nadaljevanje';
    if (isAdvertiser) return 'Izpolnite podatke za oglaševanje';
    if (isCustom) return 'Izpolnite podatke za prilagojeni paket';
    return 'Izpolnite podatke za nadaljevanje';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let metadata = {};
      
      if (isMemoryPage) {
        if (!formData.slug) {
          toast.error('Prosimo vnesite povezavo do spominske strani');
          setLoading(false);
          return;
        }
        
        // Extract slug from various URL formats
        // Supports: https://osmrtnica.com/m/slug, https://www.osmrtnica.com/m/slug, 
        //          https://localhost:3000/m/slug, /m/slug, or just slug
        let slug = formData.slug.trim();
        
        // Match any URL pattern with /m/ in it
        const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:[^\/]+)?\/m\/(.+)/;
        const match = slug.match(urlPattern);
        
        if (match) {
          // Extract the slug part after /m/
          slug = match[1];
        }
        // If no match, use the input as-is (assuming it's already just the slug)
        
        // Clean up any trailing slashes or query parameters
        slug = slug.split('?')[0].split('#')[0].replace(/\/$/, '');
        
        metadata = {
          slug,
          userId: user?.id,
          userEmail: user?.email
        };
      } else if (isFlorist) {
        // For florists, directly proceed with checkout using user account
        if (!user) {
          toast.error('Potrebna je prijava kot cvetličarna');
          setLoading(false);
          return;
        }
        
        metadata = {
          userId: user?.id,
          userEmail: user?.email
        };
      } else if (isAdvertiser) {
        if (!formData.email || !formData.city || !formData.page) {
          toast.error('Prosimo izpolnite vsa obvezna polja');
          setLoading(false);
          return;
        }
        
        metadata = {
          email: formData.email,
          name: formData.name,
          city: formData.city,
          page: formData.page
        };
      } else if (isCustom) {
        if (!formData.email || !formData.name) {
          toast.error('Prosimo izpolnite vsa obvezna polja');
          setLoading(false);
          return;
        }
        
        metadata = {
          email: formData.email,
          name: formData.name,
          customCode: formData.customCode
        };
      }

      const url = process.env.NEXT_PUBLIC_API_URL;
      console.log("url", url);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/payment/create`, {
        packageType,
        metadata
      });

      if (response.data.success) {
        toast.success('Preusmerjamo na plačilo...');
        // Redirect to Mollie payment page
        window.location.href = response.data.data.paymentUrl;
        onPaymentCreated?.(response.data.data);
      }
    } catch (error) {
      console.error('Payment creation error:', error);
      toast.error(error.response?.data?.message || 'Napaka pri ustvarjanju plačila');
    } finally {
      setLoading(false);
    }
  };

  const renderFormFields = () => {
    if (isMemoryPage) {
      return (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💡 Aktivirajte skrbništvo spominske strani in omogočite bližnjim dodajanje spominov in vsebin.
            </p>
          </div>
          
          <Input
            // label="Povezava do spominske strani"
            placeholder="https://osmrtnica.com/m/ime-priimek"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            required
            variant="bordered"
            classNames={{
              input: "text-base",
              label: "text-sm font-medium",
              inputWrapper: "border-gray-300 hover:border-purple-400 focus-within:border-purple-500"
            }}
            description="Vnesite celoten URL spominske strani"
            startContent={
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            }
          />
        </div>
      );
    }

    if (isFlorist) {
      if (!user) {
        return (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
            <div className="mb-3">
              <svg className="w-12 h-12 text-red-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-red-900 dark:text-red-200 mb-2">Prijava potrebna</h4>
            <p className="text-red-700 dark:text-red-300">
              Za nadaljevanje se morate prijaviti kot cvetličarna.
            </p>
          </div>
        );
      }
      return (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-1">Račun potrjen</h4>
                <p className="text-sm text-green-700 dark:text-green-300 mb-2">
                  Plačilo bo povezano z vašim računom:
                </p>
                <div className="bg-white dark:bg-gray-800 px-3 py-2 rounded border border-green-300 dark:border-green-700">
                  <p className="text-sm font-mono text-gray-900 dark:text-gray-100">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              ℹ️ Kliknite `&quot;`Nadaljuj na plačilo`&quot;` za dokončanje naročnine.
            </p>
          </div>
        </div>
      );
    }

    if (isAdvertiser) {
      return (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              📢 Izpolnite podatke za nastavitev vašega oglasa
            </p>
          </div>

          <Input
            // label="E-mail naslov"
            type="email"
            placeholder="vas.email@primer.si"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            variant="bordered"
            classNames={{
              input: "text-base",
              label: "text-sm font-medium",
              inputWrapper: "border-gray-300 hover:border-purple-400 focus-within:border-purple-500"
            }}
            startContent={
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
          
          <Input
            // label="Ime ali naziv podjetja"
            placeholder="Vaše ime ali naziv podjetja"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            variant="bordered"
            classNames={{
              input: "text-base",
              label: "text-sm font-medium",
              inputWrapper: "border-gray-300 hover:border-purple-400 focus-within:border-purple-500"
            }}
            description="Neobvezno"
            startContent={
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />
          
          <Select
            // label="Izberi mesto"
            placeholder="Izberite mesto za oglaševanje"
            selectedKeys={formData.city ? [formData.city] : []}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            required
            variant="bordered"
            classNames={{
              label: "text-sm font-medium",
              trigger: "border-gray-300 hover:border-purple-400 data-[focus=true]:border-purple-500"
            }}
            startContent={
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          >
            {SLOVENIAN_CITIES.map(city => (
              <SelectItem key={city.value} value={city.value} className='bg-slate-800'>
                {city.label}
              </SelectItem>
            ))}
          </Select>
          
          <Select
            // label="Stran za oglaševanje"
            placeholder="Izberite stran"
            selectedKeys={formData.page ? [formData.page] : []}
            onChange={(e) => setFormData({ ...formData, page: e.target.value })}
            required
            variant="bordered"
            classNames={{
              label: "text-sm font-medium",
              trigger: "border-gray-300 hover:border-purple-400 data-[focus=true]:border-purple-500"
            }}
            startContent={
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
          >
            {ADVERTISER_PAGES.map(page => (
              <SelectItem key={page.value} value={page.value} className='bg-slate-800'>
                {page.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      );
    }

    if (isCustom) {
      return (
        <div className="space-y-5">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-purple-800 dark:text-purple-200">
              🎯 Prilagojeni paket za posebne potrebe
            </p>
          </div>

          <Input
            type="email"
            placeholder="vas.email@primer.si"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            variant="bordered"
            classNames={{
              input: "text-base",
              label: "text-sm font-medium",
              inputWrapper: "border-gray-300 hover:border-purple-400 focus-within:border-purple-500"
            }}
            startContent={
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
          
          <Input
            placeholder="Vaše ime ali naziv podjetja"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            variant="bordered"
            classNames={{
              input: "text-base",
              label: "text-sm font-medium",
              inputWrapper: "border-gray-300 hover:border-purple-400 focus-within:border-purple-500"
            }}
            startContent={
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          />

          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              ℹ️ Koda paketa: <span className="font-mono font-bold">{formData.customCode}</span>
            </p>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="2xl"
      classNames={{
        base: "bg-white dark:bg-gray-900",
        backdrop: "bg-gradient-to-t from-zinc-900/90 to-zinc-900/70 backdrop-blur-sm",
        closeButton: "hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 transition-colors"
      }}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn"
            }
          }
        }
      }}
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1 border-b border-gray-200 dark:border-gray-800 pb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {getModalTitle()}
              </h3>
              <p className="text-sm font-normal text-gray-600 dark:text-gray-400 mt-1">
                {getModalDescription()}
              </p>
            </ModalHeader>
            
            <ModalBody className="py-6">
              {renderFormFields()}
            </ModalBody>
            
            <ModalFooter className="border-t border-gray-200 dark:border-gray-800 pt-4">
              <Button 
                variant="light" 
                onPress={onClose}
                className="font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                Prekliči
              </Button>
              <Button 
                color="primary" 
                type="submit"
                isLoading={loading}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50"
                startContent={!loading && (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                )}
              >
                {loading ? 'Obdelovanje...' : 'Nadaljuj na plačilo'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PaymentModal;