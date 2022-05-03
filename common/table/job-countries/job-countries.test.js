import { render, screen } from '@testing-library/react';
import JobCountries from './index';

describe('<JobCountries /> component test', () => {
  test('Should display remote badge if it is remote', async () => {
    render(<JobCountries value={[]} isRemote={true} />);
    const label = await screen.getByText(/Remote/i);
    expect(label).toBeInTheDocument();
  });

  test('Should match snapshot for the <JobCountries /> component', () => {
    const value = [
      {
        id: 1,
        code: 'IN',
        name: 'India',
        locations: [{ city: 'Mumbai' }],
      },
      {
        id: 2,
        code: 'IN',
        name: 'India',
        locations: [{ city: 'Bangalore' }],
      },
    ];

    const { container } = render(<JobCountries value={value} isRemote={true} />);
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        position: relative;
      }

      .c1 {
        position: relative;
        display: inline-block;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: flex-start;
        -webkit-box-align: flex-start;
        -ms-flex-align: flex-start;
        align-items: flex-start;
      }

      .c2 {
        display: inline-block;
        position: relative;
        left: -10px;
      }

      .c4 {
        display: inline-block;
        padding: 2px 8px;
        border-radius: 15px;
      }

      .c6 {
        display: inline-block;
        -webkit-text-decoration: none;
        text-decoration: none;
      }

      .c3 {
        padding: 8px 12px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-align-items: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        cursor: pointer;
      }

      .c5 {
        display: inline-block;
        top: 8px;
        position: relative;
      }

      <div>
        <div
          class="c0"
        >
          <div
            class="c1"
          >
            <div>
              <div
                class="c2"
              >
                <div
                  class="c3"
                >
                  Mumbai, IN
                </div>
              </div>
              <br />
              <div
                class="c4"
              >
                Remote
              </div>
            </div>
            <div
              class="c5"
            >
              <a
                class="c6"
                href=""
              >
                +
                1
              </a>
            </div>
          </div>
        </div>
      </div>
    `);
  });
});
