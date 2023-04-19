import { Switch } from '@headlessui/react'
import SimpleSelect from "@/components/SimpleSelect"

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// https://script.google.com/macros/s/AKfycbytbDGJDh1AffCTML8EwOnrIHHL0lvF1a6v3hdgUTbuCaKlzgljJYOZh-iOsg-x2GQadA/exec?id=165ZQjRDegYgSONV-Xup_Y3fTBYoJhIoiV9G0S6FTsI8

export default function Example({
  pnls,
  handleChange,
  handleChangeText,
  handleChangeName,
  onSave,
  mappingName,
  isChecked,
  setIsChecked
}: any) {

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className='mb-4'>
        <h1 className="text-base font-semibold leading-6 text-gray-900">Mapping of the P&L</h1>
        <p className="mt-2 text-sm text-gray-700">
          Choose the accounts you want to integrate into the template. You can also assign them a custom name
        </p>
      </div>
      <div className="mt-4 mb-4 divide-y divide-gray-200 border-b border-t border-gray-200 w-1/3">
        <div className="relative flex items-start py-4">
            <div className="min-w-0 flex-1 text-sm leading-6">
              <label htmlFor={`existing-mapping`} className="select-none font-semibold text-gray-900">
                Select an existing one
              </label>
            </div>
            <div className="ml-3 flex h-6 items-center">
              <input
                id={`existing-mapping`}
                name={`existing-mapping`}
                type="checkbox"
                value={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="h-5 w-5 rounded border-indigo-600 text-indigo-600 focus:ring-indigo-600"
              />
            </div>
          </div>
      </div>
      <div className="sm:flex sm:items-end justify-between">
        <div>
          <label htmlFor='mapping-name' className="text-normal font-semibold mb-2 block">Mapping Name</label>
          {isChecked 
            ? <SimpleSelect />
            : <input
                type="text"
                name="name"
                id="mapping-name"
                value={mappingName}
                onChange={event => handleChangeName(event.target.value)}
                className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 w-[410px]"
                placeholder="Insert a name"
              />
          }
        </div>
        
          
        <button
          type="button"
          onClick={onSave}
          className="block rounded-md bg-indigo-600 py-2 px-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save mapping
        </button>
      </div>
      {!isChecked && (
        <div className="-mx-4 mt-6 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  P&L Accounts
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Include on Template
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Name on Template
                </th>
                
              </tr>
            </thead>
            <tbody>
              {pnls.map((pnl: any, planIdx: number) => {
                if (
                  pnl.name !== 'Total Income' && 
                  pnl.name !== 'Gross profit' && 
                  pnl.name !== 'Total Expenses' &&
                  pnl.name !== 'Net Operating Income' &&
                  pnl.name !== 'Net Income' &&
                  pnl.name !== 'Cost of Goods Sold' &&
                  pnl.name !== 'Total Cost of Goods Sold' &&
                  pnl.name !== 'Total Other Expenses'
                )
                return (
                  <tr key={pnl.name}>
                    <td
                      className={classNames(
                        planIdx === 0 ? '' : 'border-t border-transparent',
                        'relative py-4 pl-4 pr-3 text-sm sm:pl-6'
                      )}
                    >
                      <div className="font-medium text-gray-900">
                        {pnl.name}
                        {/* {plan.isCurrent ? <span className="ml-1 text-indigo-600">(Current Plan)</span> : null} */}
                      </div>
                      {/* <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                        <span>
                          {plan.memory} / {plan.cpu}
                        </span>
                        <span className="hidden sm:inline">·</span>
                        <span>{plan.storage}</span>
                      </div> */}
                      {planIdx !== 0 ? <div className="absolute right-0 left-6 -top-px h-px bg-gray-200" /> : null}
                    </td>
                    <td
                      className={classNames(
                        planIdx === 0 ? '' : 'border-t border-gray-200',
                        'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                      )}
                    >
                      {pnl.group}
                    </td>
                    <td
                      className={classNames(
                        planIdx === 0 ? '' : 'border-t border-gray-200',
                        'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                      )}
                    >
                      <Switch
                        checked={pnl.isIncluded}
                        onChange={() => handleChange(planIdx)}
                        className={classNames(
                          pnl.isIncluded ? 'bg-indigo-600' : 'bg-gray-200',
                          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={classNames(
                            pnl.isIncluded ? 'translate-x-5' : 'translate-x-0',
                            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                          )}
                        />
                      </Switch>
                      
                    </td>
                    <td
                      className={classNames(
                        planIdx === 0 ? '' : 'border-t border-gray-200',
                        'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell'
                      )}
                    >
                      <input
                        type="text"
                        name={pnl.name}
                        // id="email"
                        value={pnl.nameOnTemplate}
                        onChange={event => handleChangeText(planIdx, event)}
                        disabled={!pnl.isIncluded}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Text"
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
