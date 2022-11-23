import React from 'react';
import { FormattedMessage } from 'react-intl';

import {
	BsSearch,
	BsCardHeading,
	BsClipboardData,
	BsPersonLinesFill,
	BsShieldLock,
	BsCollection,
	BsInfoSquare,
	BsFileEarmarkArrowDown,
	BsFileEarmarkArrowUp,
	BsFileText,
	BsPersonCheck
} from 'react-icons/bs';

import { IconDashboard, IconDeviceAnalytics, IconPencil } from '@tabler/icons';

const icons = {
	IconDashboard: IconDashboard,
	IconDeviceAnalytics,

	BsSearch: BsSearch,
	BsCardHeading: BsCardHeading,
	BsClipboardData: BsClipboardData,
	BsCollection: BsCollection,
	BsFileText: BsFileText,
	BsInfoSquare: BsInfoSquare,
	BsPersonLinesFill: BsPersonLinesFill,
	BsShieldLock: BsShieldLock,
	BsFileEarmarkArrowDown: BsFileEarmarkArrowDown,
	BsFileEarmarkArrowUp: BsFileEarmarkArrowUp,
	BsPersonCheck: BsPersonCheck,

	IconPencil: IconPencil
};

const menuItems = {
	items: [
		{
			id: 'oparations',
			title: <FormattedMessage id="عملیات" />,
			type: 'group',
			children: [
				{
					id: 'entryDocument',
					title: <FormattedMessage id="اسناد وارده" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsFileEarmarkArrowDown'],
					breadcrumbs: false
				},
				{
					id: 'outputDocument',
					title: <FormattedMessage id="اسناد صادره" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsFileEarmarkArrowUp'],
					breadcrumbs: false
				}
			]
		},
		{
			id: 'reports',
			title: <FormattedMessage id="گزارشات" />,
			type: 'group',
			children: [
				{
					id: 'connectionTest',
					title: <FormattedMessage id="تست ارتباط" />,
					type: 'item',
					url: '/connection',
					icon: icons['IconDashboard'],
					breadcrumbs: false
				},
				{
					id: 'membershipCustomer',
					title: <FormattedMessage id="استعلام عضویت مشتری" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsPersonCheck'],
					breadcrumbs: false
				},
				{
					id: 'searchDocuments',
					title: <FormattedMessage id="جستوجوی اسناد" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsSearch'],
					breadcrumbs: false
				},
				{
					id: 'documentStatus',
					title: <FormattedMessage id="خلاصه وضعیت اسناد" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsCardHeading'],
					breadcrumbs: false
				},
				{
					id: 'productInventory',
					title: <FormattedMessage id="موجودی محصولات در سامانه تجارت" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsClipboardData'],
					breadcrumbs: false
				}
			]
		},
		{
			id: 'basicInformation',
			title: <FormattedMessage id="اطلاعات پایه" />,
			type: 'group',
			children: [
				{
					id: 'productsInformation',
					title: <FormattedMessage id="اطلاعات کلاها" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsCollection'],
					breadcrumbs: false
				},
				{
					id: 'warehouseInformation',
					title: <FormattedMessage id="اطلاعات انبار" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsFileText'],
					breadcrumbs: false
				}
			]
		},

		{
			id: 'setting',
			title: <FormattedMessage id="تنظیمات" />,
			// caption: <FormattedMessage id="pages-caption" />,
			type: 'group',
			children: [
				{
					id: 'connectSystem',
					title: <FormattedMessage id="ارتباط با سامانه" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsInfoSquare'],
					breadcrumbs: false
				},
				{
					id: 'userManagement',
					title: <FormattedMessage id="مدیریت کاربران" />,
					type: 'item',
					url: '/dashboard/default',
					icon: icons['BsPersonLinesFill'],
					breadcrumbs: false
				},

				{
					id: 'authentication',
					title: <FormattedMessage id="authentication" />,
					type: 'collapse',
					icon: icons['IconKey'],
					children: [
						{
							id: 'login3',
							title: <FormattedMessage id="login" />,
							type: 'item',
							url: '/user/login',
							target: true
						},
						{
							id: 'register3',
							title: <FormattedMessage id="register" />,
							type: 'item',
							url: '/pages/register/register3',
							target: true
						}
					]
				}
			]
		},
		{
			id: 'utilities',
			title: <FormattedMessage id="utilities" />,
			type: 'group',
			children: [
				{
					id: 'Table',
					title: <FormattedMessage id="Table" />,
					type: 'item',
					url: '/tables/tbl-basic',
					icon: icons['IconShadow']
				},
				{
					id: 'icons',
					title: <FormattedMessage id="icons" />,
					type: 'collapse',
					icon: icons['IconPencil'],
					children: [
						{
							id: 'util-tabler-icons',
							title: <FormattedMessage id="tabler-icons" />,
							type: 'item',
							url: '/icons/tabler-icons'
						}
					]
				}
			]
		}
	]
};

export default menuItems;
