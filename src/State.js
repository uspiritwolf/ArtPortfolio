import { proxy } from 'valtio'

import React from 'react'
import { Page1 } from './Models/Page1'
import { Page2 } from './Models/Page2'
import { Page3 } from './Models/Page3'

const state = proxy({
	pages: [<Page1/>, <Page2/>, <Page3/>],
	currentPage: 0
})

export { state }
