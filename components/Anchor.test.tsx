import { render, screen } from "@testing-library/react"
import Anchor from "./Anchor"
import '@testing-library/jest-dom'

describe('Anchor', () => {
  it('Renders given text', () => {
    render(<Anchor
      text="Hello there"
    />)

    const text = screen.getByText('Hello there')
    expect(text).toBeInTheDocument()
  })

  it('Renders different class list based on hideBorder prop', () => {
    const elements = render(<>
      <Anchor
        text="Hello there"
      />
      <Anchor
        text="Hello there"
        hideBorder
      />
    </>)
    const children = elements.asFragment().children

    expect(children.length).toBe(2)
    expect(children[0].classList).not.toStrictEqual(children[1].classList)
  })
})