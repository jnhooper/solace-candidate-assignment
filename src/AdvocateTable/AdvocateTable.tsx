import { type FormEvent, useRef } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  useQuery,
} from '@tanstack/react-query'

import { type Advocate } from '../app/api/advocates/route'
import styles from './styles.module.css'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import PhoneLink from '@/PhoneLink';
interface SearchForm {
  name?: string
}

export const AdvocateTable = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname();
  const { replace } = useRouter();
  const {
    error,
    isLoading,
    data
  } = useQuery<{ data: Advocate[] }>({
    //ideally we'd add pagination here as well as sorting and other filter controls
    queryKey: [
      'todos',
      Object.fromEntries(searchParams),
    ], queryFn: async () => {
      const response = await fetch(
        `/api/advocates/?${searchParams.toString()}`
      )
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const result = await response.json()
      return result
    }
  })
  const inputRef = useRef<HTMLInputElement>(null)


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formJson = Object.fromEntries(formData) as SearchForm
    const params = new URLSearchParams(searchParams);
    if (formJson.name) {
      params.set('name', formJson.name);
    } else {
      params.delete('name');
    }
    replace(`${pathname}?${params.toString()}`);
  }



  const showTable = !isLoading && !error && data?.data
  const tableClassName = `${styles.table} table-auto text-xl border-collapse border border-slate-500`


  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit}
        >
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Label htmlFor="name">
              Search for Advocate
            </Label>
            <Input
              ref={inputRef}
              id="name"
              name="name"
            />
            <Button type='submit'>search</Button>
          </div>
          <br />
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              //when we have more filters this will clear them all
              if (inputRef?.current) {
                inputRef.current.value = ''
              }
              const params = new URLSearchParams(searchParams);
              params.delete('name');
              replace(`${pathname}?${params.toString()}`);
            }}>
            Clear Search
          </Button>
        </form>
      </div>
      <br />
      <br />
      {showTable ?
        <table
          className={tableClassName}
        >
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>City</th>
              <th>Degree</th>
              <th>Specialties</th>
              <th>Years of Experience</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {data.data.map((advocate, index) => {
              return (
                <tr key={index}>
                  <td
                    align='center'
                  >
                    {advocate.firstName}
                  </td>
                  <td
                    align='center'
                  >
                    {advocate.lastName}
                  </td>
                  <td
                    align='center'
                  >
                    {advocate.city}
                  </td>
                  <td
                    align='center'
                  >
                    {advocate.degree}</td>
                  <td
                    align='left'
                  >
                    {advocate.specialties.join(', ')}
                  </td>
                  <td
                    align='center'
                  >
                    {advocate.yearsOfExperience}
                  </td>
                  <td
                    className={`${styles.phone}`}
                    align='center'
                  >
                    <PhoneLink num={advocate.phoneNumber} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        : null}
      <div>
        <Button
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            const currentPage = params.get('pageNumber')
            if (!currentPage || currentPage === '0') {
              return;
            } else {

              params.set('pageNumber', `${parseInt(currentPage) - 1}`);
            }
            replace(`${pathname}?${params.toString()}`);
          }}
        >prev</Button>
        <Button
          onClick={() => {
            const params = new URLSearchParams(searchParams);
            const currentPage = params.get('pageNumber') || '0'
            //TODO fix logic
            if (currentPage === '10') {
              return;
            } else {
              params.set('pageNumber', `${parseInt(currentPage) + 1}`);
            }
            replace(`${pathname}?${params.toString()}`);
          }}
        >next</Button>
      </div>
      {isLoading ? <div> ...loading please wait</div> : null}
      {
        error ? (

          <div className='text-red-500'>
            Whoops!
            <br />
            {error.message}
          </div>) : null
      }
    </div >
  )

}
