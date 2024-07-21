'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  // Ce hook est utilisé pour obtenir les paramètres de recherche actuels de l'URL
  const searchParams = useSearchParams();
  // Ce hook est utilisé pour obtenir le chemin de l'URL actuelle
  const pathname = usePathname();
  // Ce hook est utilisé pour accéder à l'objet router, qui permet de naviguer 
  // entre les pages et de manipuler l'URL
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => {
    // Cette ligne crée une nouvelle instance de URLSearchParams 
    // en utilisant les paramètres de recherche actuels
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    // Définition de query avec "term"
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    // Mettre à jour l'URL avec les nouveaux paramètres de recherche sans recharger la page
    // La méthode toString de URLSearchParams convertit les paramètres en une chaîne de requête valide
    replace(`${pathname}?${params.toString()}`);
    }, 300);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
