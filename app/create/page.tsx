import React from 'react'
import PageSidebar from './_components/PageSidebar'
import ListingForm from './_components/ListingForm'

const page = () => {
  return (
    <div className="relative flex flex-row w-full h-full justify-between">
      <PageSidebar />
      <div className="relative w-full border-l border-border">
        <ListingForm />
      </div>
    </div>
  )
}

export default page
