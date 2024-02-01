"use client"// AllUserInfos.tsx
import React from 'react';
import Link from 'next/link';

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableHead,
  TableRow,
  Title,
  Button, // Buttonをインポート
} from "@tremor/react";
import type { UserData } from "@/lib/types";

const AllUserInfos = ({ data }: { data: UserData[] }) => {
  return (
    <Card>
      <Title>All User Data</Title>
      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>UserID</TableHeaderCell>
            <TableHeaderCell>Firstname</TableHeaderCell>
            <TableHeaderCell>Lastname</TableHeaderCell>
            <TableHeaderCell>UserPage</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.firstname}</TableCell>
              <TableCell>{item.lastname}</TableCell>
              <TableCell><Link href={`/mypage/${item.id}`}>
                <Button size='xs'>
                  出勤記録管理
                </Button>
              </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default AllUserInfos;