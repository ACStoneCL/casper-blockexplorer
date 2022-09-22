import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm, SubmitHandler, Resolver } from 'react-hook-form';
import { useAppSelector, getBounds } from '../../../store';
import logo from '../../../assets/images/logo.png';

type FormValues = {
  hash: string;
  filterOptions: string;
  path: string;
  blockHeight: string | number;
};

const resolver: Resolver<FormValues> = async values => {
  const isHexadecimal = /^[A-F0-9]+$/i.test(values.hash);
  const isPublicKey = /^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(
    values.hash,
  );
  const formattedBlockHeight = values.hash.split(',').join('').trim();
  const onlyNumbers = /^[0-9]+$/.test(formattedBlockHeight);

  let currentErrorMessage;

  const errorMessage = {
    account: 'Please enter a valid public key.',
    deploy: 'Please enter a valid deploy hash.',
    block: 'Please enter a valid block hash.',
    blockHeight: 'Please enter a valid block height',
  };

  const defaultErrorMessage = 'Please enter a valid hash or block height';

  const path = {
    account: `/account/${values.hash}`,
    deploy: `/deploy/${values.hash}`,
    block: `/block/${values.hash}`,
    blockHeight: `/block/${formattedBlockHeight}?type=height`,
  };

  switch (values.filterOptions) {
    case 'account':
      if (isPublicKey) {
        values.path = path.account;
      } else currentErrorMessage = errorMessage.account;
      break;
    case 'deploy':
      if (isHexadecimal) {
        values.path = path.deploy;
      } else currentErrorMessage = errorMessage.deploy;
      break;
    case 'block':
      if (isHexadecimal) {
        values.path = path.block;
      } else currentErrorMessage = errorMessage.block;
      break;
    case 'blockHeight':
      if (formattedBlockHeight && onlyNumbers) {
        values.path = path.blockHeight;
      } else currentErrorMessage = errorMessage.blockHeight;
      break;
    default:
      currentErrorMessage = defaultErrorMessage;
  }

  return {
    values: values.filterOptions ? values : {},
    errors: !values.path
      ? {
          hash: {
            type: 'required',
            message: `${currentErrorMessage || defaultErrorMessage}`,
          },
        }
      : {},
  };
};

const navItems = [
  {
    title: 'Blocks',
    path: '/',
    key: 'blocks',
  },
  {
    title: 'Peers',
    path: '/peers',
    key: 'peers',
  },
];

export const DemoHeader: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver, defaultValues: { hash: '' } });
  const submitPath: SubmitHandler<FormValues> = data => navigate(data.path);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ hash: '' });
    }
  }, [isSubmitSuccessful, reset]);

  const [isOpened, setIsOpened] = useState(false);
  const bounds = useAppSelector(getBounds);

  const windowWidth = bounds?.width || 0;

  useEffect(() => {
    const escKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isOpened) {
          setIsOpened(false);
        }
      }
    };

    document.addEventListener('keydown', escKeyHandler);

    return () => {
      document.removeEventListener('keydown', escKeyHandler);
    };
  }, [isOpened]);

  const form = (
    <div className={`${isOpened ? 'block' : 'hidden'} lg:block`}>
      <form onSubmit={handleSubmit(submitPath)}>
        <label htmlFor="default-search" className="sr-only">
          Search
        </label>
        <div
          className={`${
            isOpened ? 'pt-0' : ''
          } bg-casper-blue pl-10 flex relative justify-center pt-10 lg:pt-33`}>
          <select
            {...register('filterOptions')}
            className="relative left-10 w-90 h-32 sm:h-36 md:h-35 md:w-114 md:mt-7 text-center rounded-r-none bg-casper-red rounded-lg border-none text-white focus:outline-none text-12 xs:text-13 sm:text-14 md:text-16 xxs:w-105">
            <option value="account">Account</option>
            <option value="deploy">Deploy Hash</option>
            <option value="block">Block Hash</option>
            <option value="blockHeight">Block Height</option>
          </select>
          <input
            {...register('hash', { required: true })}
            type="search"
            id="search"
            className="block py-4 sm:py-6 md:py-5 px-20 sm:pl-20 md:px-20 md:mt-7 text-xs text-gray-900 bg-gray-50 rounded-lg border-1 border-solid border-gray-400 focus:outline-none w-full max-w-280 xl:w-500 xxs:text-sm xxs:pr-32"
            required
          />
          <button
            type="submit"
            className="bg-casper-red relative right-20 px-16 md:mt-7 hover:bg-red-400 focus:outline-none font-medium rounded-r-lg border-none">
            <svg
              aria-hidden="true"
              className="w-24 h-24 text-white pt-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
        {errors.hash && (
          <div className="flex flex-row justify-center relative -bottom-5">
            <svg className="fill-casper-blue w-20 h-30 stroke-casper-red stroke-2 mr-2 pt-10">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <p className="text-casper-red pt-10">{errors.hash.message}</p>
          </div>
        )}
      </form>
    </div>
  );
  return (
    <header className="w-full bg-casper-blue">
      <div className="flex flex-row justify-between relative w-full max-w-1600 pl-22 md:pl-30 xl:pl-46 pr-28 md:pr-36 xl:pr-52">
        <div className="pt-30 pb-35">
          <Link
            className="no-underline hover:no-underline focus:no-underline flex flex-row items-center"
            to="/">
            <div className="flex flex-row items-center">
              <img className="h-40 xxs:h-50" src={logo} alt="Casper Logo" />
              <p className="text-white text-18 xs:text-20 sm:text-24 md:text-26 pl-10 lg:pl-12 font-bold w-20ch">
                Casper BlockExplorer
              </p>
            </div>
          </Link>
        </div>
        {windowWidth > 1025 ? form : null}
        <nav className="z-10 py-10 lg:py-40 bg-casper-blue lg:w-200">
          <div className="flex flex-col lg:flex-row lg:justify-between">
            <div className="z-30 flex flex-row justify-end lg:justify-between">
              <button
                type="button"
                className="lg:hidden bg-transparent border-none h-40"
                onClick={() => setIsOpened(!isOpened)}>
                {isOpened ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="white"
                    className="w-40 h-40">
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-40 h-40">
                    <path
                      fillRule="evenodd"
                      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="bg-casper-blue border-none lg:flex lg:space-x-12 lg:flex-row lg:w-auto">
              {isOpened && (
                <nav className="pr-20 pl-20 lg:hidden">
                  <ul className="z-10 bg-casper-blue flex flex-col gap-2 absolute w-screen h-200 items-center justify-center left-0 top-0">
                    {navItems.map(({ path, title, key }) => {
                      return (
                        <li key={key}>
                          <Link
                            to={path}
                            className="text-white text-22 p-5 xxs:py-11 w-full font-medium tracking-wide">
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                    {form}
                  </ul>
                </nav>
              )}
              <nav className="hidden lg:block">
                <ul className="flex gap-x-8 pt-4">
                  {navItems.map(({ path, title, key }) => {
                    return (
                      <li key={key}>
                        <Link
                          to={path}
                          className="text-white text-18 py-5 xxs:py-11 lg:py-0 w-full font-medium tracking-wide">
                          {title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
